import { Cookies } from 'react-cookie';


  const cookies = new Cookies(null, { path: "/" });

 export const getCookies = async (name) => {
  const data = await cookies.get(name)
    return data ;
  };

  export const setCookies = (name, value, expire=365) => {
    cookies.set(name, value, {
      httpOnly: false, // This needs to be false for client-side JavaScript
      secure: true,
      expires: new Date(Date.now() + expire * 24 * 60 * 60 * 1000 * 2),
      sameSite: "lax",
      path: "/",
    });
    return { status: true };
  };

  export const deleteCookies = (name) => {
    cookies.remove(name,  {
      path: "/",
    });
    return { status: true };
  };

 

