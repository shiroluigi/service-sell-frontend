import "../assets/LoginModal.css"

const LoginModal = ({ onClose }) => {
    return (
    <>
      <div className="overlay" onClick={onClose}></div>

      <div className="modal">
        <h2>Login</h2>
        <p>This is a login modal</p>
        <button onClick={onClose}>Close</button>
      </div>
    </>
  );
}

export default LoginModal;

