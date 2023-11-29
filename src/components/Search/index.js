import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Search.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Search() {
  const navigate = useNavigate();
  const refInput = useRef(null);

  const handleSearch = () => {
    refInput.current.value && navigate(`../explore/${refInput.current.value}`);
  };

  return (
    <div className={styles.search}>
      <input
        ref={refInput}
        className={styles.searchInput}
        onKeyUp={(e) => e.key === "Enter" && handleSearch()}
        placeholder="Search"
        spellCheck="false"
      ></input>
      <button onClick={handleSearch} className={styles.searchButton}>
        <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>
      </button>
    </div>
  );
}
