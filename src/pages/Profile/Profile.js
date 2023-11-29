import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProfile,
  updateEmail,
  reauthenticateWithCredential,
  deleteUser,
  updatePassword,
  EmailAuthProvider,
} from "firebase/auth";
import { auth, storage } from "../../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateInforUser } from "../../app/slice/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Title from "../../components/Title";
import Loading from "../../components/Loading";
import { OutlineButton } from "../../components/Button";
import Modal from "../../components/modal";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Profile.module.scss";
import className from "classnames/bind";
const cx = className.bind(styles);

export default () => {
  const avatar = useSelector((state) => state.auth.currentUser.photoURL);
  const { uid, providerId } = useSelector((state) => state.auth.currentUser);
  const displayName = useSelector(
    (state) => state.auth.currentUser.displayName
  );
  const email = useSelector((state) => state.auth.currentUser.email);
  const dispatch = useDispatch();
  const storageRef = ref(storage, `avatars/${uid}`);

  const [oldPassword, setOldPassword] = useState("");
  const [currentName, setCurrentName] = useState(displayName);
  const [currentEmail, setCurrentEmail] = useState(email);
  const [password, setPassword] = useState("");
  const inputNameRef = useRef(null);
  const inputEmailRef = useRef(null);
  const [isUpdateName, setUpdateName] = useState(false);
  const [isUpdateEmail, setUpdateEmail] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [updateType, setUpdateType] = useState("");
  const [isLoading, setLoading] = useState(false);

  const toastifySetting = {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
  useEffect(() => {
    inputNameRef.current.focus();
  }, [isUpdateName]);

  useEffect(() => {
    inputEmailRef.current.focus();
  }, [isUpdateEmail]);

  const handlePhotoUrl = async (e) => {
    try {
      setLoading(true);
      await uploadBytes(storageRef, e.target.files[0]);
      const respone = await getDownloadURL(storageRef);
      await updateProfile(auth.currentUser, {
        photoURL: respone,
      });
      dispatch(
        updateInforUser({
          photoURL: respone,
        })
      );
      setLoading(false);
      toast.success("Update photo success !", toastifySetting);
    } catch (error) {
      console.log(error);
    }
  };

  const reAuthentication = async () => {
    setModalActive(false);
    const credential = EmailAuthProvider.credential(email, oldPassword);
    try {
      setLoading(true);
      await reauthenticateWithCredential(auth.currentUser, credential);

      switch (updateType) {
        case "email":
          try {
            await updateEmail(auth.currentUser, currentEmail);
            dispatch(
              updateInforUser({
                email: currentEmail,
              })
            );
            toast.success("Update email success!", toastifySetting);
          } catch (error) {
            toast.error(`${error.message}`, toastifySetting);
          } finally {
            setLoading(false);
          }
          break;
        case "password":
          try {
            await updatePassword(auth.currentUser, password);
            toast.success("Update password success!", toastifySetting);
          } catch (error) {
            toast.error(`${error.message}`, toastifySetting);
          } finally {
            setLoading(false);
          }
          break;
        case "delete":
          try {
            await deleteUser(auth.currentUser);
          } catch (error) {
            toast.error(`${error.message}`, toastifySetting);
          } finally {
            setLoading(false);
          }
          break;
        default:
          setLoading(false);
          console.log("Invalid");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Wrong password!", toastifySetting);
    }
  };

  const handleChange = (setValue) => (e) => {
    setValue(e.target.value);
  };

  const handleCancel = (setUpdate, setInputValue, defaultValue) => () => {
    setInputValue(defaultValue);
    setUpdate(false);
  };

  const handleSaveEmail = () => {
    setUpdateType("email");
    setUpdateEmail(false);
    setModalActive(true);
  };

  const handleSavePassword = () => {
    setUpdateType("password");
    setModalActive(true);
  };

  const handleSaveName = async () => {
    setUpdateName(false);
    setLoading(true);
    try {
      await updateProfile(auth.currentUser, {
        displayName: currentName,
      });
      dispatch(
        updateInforUser({
          displayName: currentName,
        })
      );
      toast.success("Update name success!", toastifySetting);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = () => {
    setUpdateType("delete");
    setModalActive(true);
  };

  return (
    <div className={cx("profile")}>
      <Title>Account Setting</Title>
      <span>
        Here you can edit public information about yourself.
        <br />
        If you signed in with Google or Facebook, you can't change your email
        and password.
      </span>
      <div className={cx("wraper-infor")}>
        <div className={cx("infor")}>
          <div className={cx("email", "group-input")}>
            <h2>Email</h2>
            <input
              ref={inputEmailRef}
              onChange={handleChange(setCurrentEmail)}
              type="text"
              value={currentEmail}
              disabled={!isUpdateEmail ? true : false}
            />
            {!isUpdateEmail ? (
              providerId === "password" && (
                <button onClick={() => setUpdateEmail(true)}>Edit</button>
              )
            ) : (
              <>
                <button onClick={handleSaveEmail}>Save</button>
                <button
                  onClick={handleCancel(setUpdateEmail, setCurrentEmail, email)}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
          <div className={cx("name", "group-input")}>
            <h2>Name</h2>
            <input
              ref={inputNameRef}
              type="text"
              onChange={handleChange(setCurrentName)}
              value={currentName}
              disabled={!isUpdateName ? true : false}
            />
            {!isUpdateName ? (
              <button onClick={() => setUpdateName(true)}>Edit</button>
            ) : (
              <>
                <button onClick={handleSaveName}>Save</button>
                <button
                  onClick={handleCancel(
                    setUpdateName,
                    setCurrentName,
                    displayName
                  )}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
          <div className={cx("password", "group-input")}>
            <h2>Change password</h2>
            <input
              type="password"
              onChange={handleChange(setPassword)}
              placeholder="New password"
            />
            {providerId === "password" && (
              <button onClick={handleSavePassword}>Change</button>
            )}
          </div>
          <div className={cx("delete-account")}>
            <OutlineButton
              className={cx("small")}
              onClick={handleDeleteAccount}
            >
              Delete Account
            </OutlineButton>
          </div>
        </div>

        <div className={cx("photo")}>
          <img src={avatar} alt="avatar" />
          <label>
            <FontAwesomeIcon icon={faArrowUpFromBracket} />
            Upload new photo
            <input type="file" onChange={handlePhotoUrl} />
          </label>
        </div>
      </div>
      <Modal
        active={modalActive}
        setActive={setModalActive}
        className={cx("cus-modal")}
      >
        <h2>Type your password again to reauthenticate</h2>
        <input
          type="password"
          value={oldPassword}
          onChange={handleChange(setOldPassword)}
          placeholder="Type your password"
        />
        <button onClick={reAuthentication}>Submit</button>
      </Modal>
      {isLoading && <Loading />}
    </div>
  );
};
