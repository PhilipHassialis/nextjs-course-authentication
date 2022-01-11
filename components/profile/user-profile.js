import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";

function UserProfile() {
  // Redirect away if NOT auth
  const { data: session, status } = useSession();
  const loading = status === "loading";

  // const [isLoading, setIsLoading] = useState(true);
  // const [loadedSessuion, setLoadedSession] = useState();

  useEffect(() => {
    // getSession().then((session) => {
    //   setLoadedSession(session);
    //   setIsLoading(false);
    //   if (!session) {
    //     window.location.href = "/auth";
    //   }
    // });
    if (!session) window.location.href = "/auth";
  }, [session]);

  if (loading) {
    return <p className={classes.profile}>Loading...</p>;
  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
}

export default UserProfile;
