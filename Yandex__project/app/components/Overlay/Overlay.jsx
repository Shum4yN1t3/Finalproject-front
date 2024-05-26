import Styles from "./Overlay.module.css";

export const Overlay = (props) => {
  return (
    <div
      className={`${Styles["overlay"]} ${Styles["overlay_is-opened"]}`}
      onClick={props.handlePopUp}
    ></div>
  );
};
