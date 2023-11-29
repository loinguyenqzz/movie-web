import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faEye,
  faLock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../app/slice/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import className from "classnames/bind";
import styles from "./Register.module.scss";
import { OutlineButton } from "../../components/Button";
import avatar from "../../assets/kindpng_4212275.png";
const cx = className.bind(styles);

export default () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [showCfPass, setShowCfPass] = useState(false);
  const dispath = useDispatch();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      try {
        await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        await updateProfile(auth.currentUser, {
          displayName: `${formik.values.firstName} ${formik.values.lastName}`,
        });
        dispath(
          loginSuccess({
            uid: auth.currentUser.uid,
            accessToken: auth.currentUser.accessToken,
            displayName: auth.currentUser.displayName,
            photoURL: auth.currentUser.photoURL
              ? auth.currentUser.photoURL
              : avatar,
            email: auth.currentUser.email,
          })
        );
        navigate("/");
        toast.success("Successful account registration");
      } catch (error) {
        console.log(error.code);
        toast.error("Email already in use!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      email: Yup.string()
        .required("Required")
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email"),
      password: Yup.string()
        .required("Required")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
          "Minimum eight characters, at least one letter and one number"
        ),
      confirmPassword: Yup.string()
        .required("Required")
        .oneOf([Yup.ref("password"), null], "Password must match"),
    }),
  });

  const handleShowPasword = () => {
    setShowPass(!showPass);
  };

  const handleShowCfpassword = () => {
    setShowCfPass(!showCfPass);
  };

  return (
    <div className={styles.register}>
      <div className={cx("tittle")}>Create Account</div>
      <form
        action=""
        className={styles.registerForm}
        onSubmit={formik.handleSubmit}
      >
        <div className={cx("nameGroup")}>
          <div className={cx("formGroup")}>
            <div className={cx("input-group")}>
              <label
                className={cx(
                  "label",
                  formik.values.firstName ? "label-active" : null
                )}
              >
                First name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={formik.values.firstName}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className={cx(
                  formik.errors.firstName && formik.touched.firstName
                    ? "input-error"
                    : ""
                )}
              />
              <FontAwesomeIcon
                icon={faUser}
                className={cx("icon")}
              ></FontAwesomeIcon>
            </div>
            {formik.errors.firstName && formik.touched.firstName && (
              <span className={cx("error")}>{formik.errors.firstName}</span>
            )}
          </div>

          <div className={cx("formGroup")}>
            <div className={cx("input-group")}>
              <label
                className={cx(
                  "label",
                  formik.values.lastName ? "label-active" : null
                )}
              >
                Last name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={formik.values.lastName}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className={cx(
                  formik.errors.lastName && formik.touched.lastName
                    ? "input-error"
                    : ""
                )}
              />
              <FontAwesomeIcon
                icon={faUser}
                className={cx("icon")}
              ></FontAwesomeIcon>
            </div>
            {formik.errors.lastName && formik.touched.lastName && (
              <span className={cx("error")}>{formik.errors.lastName}</span>
            )}
          </div>
        </div>

        <div className={styles.formGroup}>
          <div className={cx("input-group")}>
            <label
              className={cx(
                "label",
                formik.values.email ? "label-active" : null
              )}
            >
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className={cx(
                formik.errors.email && formik.touched.email ? "input-error" : ""
              )}
            />
            <FontAwesomeIcon
              icon={faEnvelope}
              className={cx("icon")}
            ></FontAwesomeIcon>
          </div>
          {formik.errors.email && formik.touched.email && (
            <span className={cx("error")}>{formik.errors.email}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <div className={cx("input-group")}>
            <label
              className={cx(
                "label",
                formik.values.password ? "label-active" : null
              )}
            >
              Password
            </label>
            <input
              type={showPass ? "text" : "password"}
              name="password"
              id="password"
              value={formik.values.password}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className={cx(
                formik.errors.password && formik.touched.password
                  ? "input-error"
                  : ""
              )}
            />
            <FontAwesomeIcon
              icon={formik.values.password ? faEye : faLock}
              className={cx("icon")}
              onClick={handleShowPasword}
            ></FontAwesomeIcon>
          </div>
          {formik.errors.password && formik.touched.password && (
            <span className={cx("error")}>{formik.errors.password}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <div className={cx("input-group")}>
            <label
              className={cx(
                "label",
                formik.values.confirmPassword ? "label-active" : null
              )}
            >
              Confirm password
            </label>
            <input
              type={showCfPass ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              value={formik.values.confirmPassword}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className={cx(
                formik.errors.confirmPassword && formik.touched.confirmPassword
                  ? "input-error"
                  : ""
              )}
            />
            <FontAwesomeIcon
              icon={formik.values.confirmPassword ? faEye : faLock}
              className={cx("icon")}
              onClick={handleShowCfpassword}
            ></FontAwesomeIcon>
          </div>
          {formik.errors.confirmPassword && formik.touched.confirmPassword && (
            <span className={cx("error")}>{formik.errors.confirmPassword}</span>
          )}
        </div>
        <OutlineButton type="submit" className={cx("small", "btn-register")}>
          Register
        </OutlineButton>
      </form>

      <div className={cx("already-member")}>
        Already a member?
        <Link to="/login" className={cx("link")}>
          {" "}
          Sign in
        </Link>
      </div>
    </div>
  );
};
