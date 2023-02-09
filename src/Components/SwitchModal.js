import "./SwitchModal.scss";
import { useRef } from "react";
import Dropdown from "../Dropdown";

const SwitchModal = ({
  user,
  setUser,
  switchModalVisible,
  setSwitchModalVisible,
}) => {
  const switchModalRef = useRef(null);
  const closeSwitchModal = (e) => {
    if (
      switchModalRef.current &&
      switchModalVisible &&
      !switchModalRef.current.contains(e.target)
    ) {
      setSwitchModalVisible(false);
    }
  };

  document.addEventListener("mousedown", closeSwitchModal);
  return (
    <>
      {switchModalVisible && (
        <div className="switch_modal_container">
          <div className="switch_modal" ref={switchModalRef}>
            <h1 className="bold">View as</h1>
            <p className="normal">
              You are currently logged in as Tom Blockley{" "}
            </p>
            <Dropdown
              placeholder={user === "default" ? "Default" : user}
              menuMarginTop="15px"
              menuItem={
                <>
                  <span
                    className="menu-item normal"
                    onClick={() => setUser("default")}
                  >
                    Default
                  </span>

                  <span
                    className="menu-item normal"
                    onClick={() => setUser("Holly Jones")}
                  >
                    Holly Jones
                  </span>
                </>
              }
            />
            <div className="button-container">
              <button
                className="button-transparent"
                onClick={() => setSwitchModalVisible(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SwitchModal;
