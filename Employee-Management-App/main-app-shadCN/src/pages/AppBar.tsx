import React from "react";
import {
  SignedOut,
  useUser,
  SignOutButton,
  SignIn,
} from "@clerk/clerk-react";

const AppBar: React.FC = () => {
  const { user } = useUser();

  if(user?.username) {
    return (
      <div className="topbar">
          <div style={{ fontWeight: "bold", fontSize: "24px" }}>Employee Management App</div>
          <div className="bigheader">
          <div className="header"
           >Welcome, {user?.firstName || user?.username}</div>
           <div>
            <SignOutButton>
             <button
               style={{
                backgroundColor: "black",
               color: "white",
               border: "none",
               padding: "10px 20px",
               borderRadius: "5px",
               cursor: "pointer",
               fontSize: "16px",
               fontWeight: "bold",
             }}
           >
               Sign Out
            </button>
          </SignOutButton>
          </div>
          </div>
         </div>
    )
  }
else
  return (
    // <div  
    // // style={{
    // //   maxWidth: "600px", margin: "0 auto", width: "100%" 
    // // }}
    // >

    //       <div>
    //   <SignedIn>
    //     <div className="appbar1">
    //       <h1>hi there</h1>
    //     {/* <h2>Welcome, {user?.firstName || user?.username}</h2> */}
    //     {/* Uncomment to display the user button */}
    //     {/* <UserButton /> */}
    //     {/* <SignOutButton /> */}
    //     </div>
    //   </SignedIn>
    //   </div>
      <div>
        <div style={{ fontWeight: "bold", fontSize: "24px" }}>Employee Management App</div>
      <SignedOut>
        <SignIn
          forceRedirectUrl="/input-data"
        />
        {/* Uncomment to display a custom sign-in button */}
        {/* <SignInButton /> */}
      </SignedOut>
    </div>
    // </div>
  );
};

export default AppBar;
