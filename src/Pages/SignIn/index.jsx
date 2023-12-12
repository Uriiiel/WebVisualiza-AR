import { useState } from "react";
import { useAuth } from "../../Context/authContext";
import { Link, useNavigate } from "react-router-dom";

function SignIn() {
  const { login, loginWithGoogle, resetPassword } = useAuth();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  // const handleChange = ({ target: { value, name } }) =>
  //   setUser({ ...user, [name]: value });

  // const handleGoogleSignin = async () => {
  //   try {
  //     await loginWithGoogle();
  //     navigate("/");
  //   } catch (error) {
  //     setError(error.message);
  //   }
  // };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!user.email) return setError("Write an email to reset password");
    try {
      await resetPassword(user.email);
      setError('We sent you an email. Check your inbox')
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-4">Iniciar sesión</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Correo
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              placeholder="Correo"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Contraseña
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Contraseña"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <button
              type="submit"
              className="mb-4 md:mb-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Iniciar sesión
            </button>
            <div>
              <a 
                href="#!" 
                className="text-sm text-blue-500 font-semibold hover:text-blue-700 mb-4 md:mb-0 mr-2"
                onClick={handleResetPassword}  
              >
                ¿Olvidaste tu contraseña?
              </a>
              {/* <button
                type="button"
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleGoogleSignin}
              >
                Iniciar sesión con Google
              </button> */}
            </div>
          </div>
          <p className="text-sm mt-4">
            ¿No tienes una cuenta?{' '}
            <Link to="/register" className="text-blue-500 font-semibold hover:text-blue-700">
              Regístrate aquí
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
  

}
export default SignIn