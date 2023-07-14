import { Link } from "react-router-dom";

const Admin = (props) => {
  const { allUsers, user } = props;
  return (
    <>
      {user && user.admin ? (
        <div className="admin">
          <div className="add-product-2">
            <Link to="/create_product">ADD NEW PRODUCT</Link>
          </div>
          <br></br>

          {allUsers.map((singleUser) => {
            return (
              <div className="user-info">
                <span className="user-id">User Id: {singleUser.id}</span>
                <span className="user-username">
                  Username: {singleUser.username}
                </span>
                <span className="user-email">Email: {singleUser.email}</span>
                {singleUser.admin ? (
                  <span className="user-admin">Administrator: Yes</span>
                ) : (
                  <span className="user-admin">Administrator: No</span>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <h3>MUST BE AN ADMINISTRATOR TO VIEW THIS PAGE</h3>
      )}
    </>
  );
};

export default Admin;
