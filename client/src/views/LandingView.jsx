import { useEffect, useState } from 'react';
import axios from 'axios';
import style from '../css/LandingView.module.css';
import LD_intro from '../utils/images/Lowered_Expectations_Intro.jpeg'

const LandingView = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8000/api/")
      .then(res => setUsers(res.data))
      .catch(err => setError("Error fetching users. Please try again later."));
  }, []);

  return (
    <div className={style.YurrrBox}>
        <div className={style.LandingCell}>
          <div className={style.LandingTitles}>
            <h1>Lowered Expectations</h1>
            <h3>Where Dreams sometimes become a reality</h3>
          </div>
          <div className={style.quoteList}>
            <ul>
              <li className={style.WordStyle}>Experience the anticipation with just a glimpse – the allure of Lowered Expectations awaits.</li>
              <li className={style.WordStyle}>Dive into possibilities, no strings attached – explore freely with our 'Try for Free' option.</li>
              <li className={style.WordStyle}>Seeking clarity or a romantic revelation? Engage with our experts and unlock the secrets of Lowered Expectations.</li>
              <li className={style.WordStyle}>Delve deeper into the enigmatic world of Lowered Expectations – every click, a step closer to unraveling its mysteries.</li>
            </ul>
          </div>
          <img src={LD_intro} alt="MTV Sitcom" className={style.PopoutImage} />
    </div>

    <div className={style.TableCell}>
  <h2>Recently Registered Users 💖</h2>
  {error && <p>{error}</p>}
  <table className={style.TableStart}>
    <thead className={style.TableHeadStart}>
      <tr>
        <th colSpan="4">{/* To span across all columns */}</th>
      </tr>
      <tr className={style.RandomBox}>
        {["#", "Profile Name", "State", "Date Joined"].map((header, index) => (
          <th className={style.TableMap} key={index}>{header}</th>
        ))}
      </tr>
    </thead>

    <tbody>
    {users.map((user, index) => (
      <tr key={user._id}>
        <th className={style.IndexCount}>{index + 1}</th>
        <td className={style.RandomBox}>
          {user.profile && user.profile.profile_name ? user.profile.profile_name : "N/A"}
        </td>
        <td className={style.RandomBox}>{user.profile && user.profile.state ? user.profile.state : "N/A"}</td>
        <td className={style.RandomBox}>{user.createdAt}</td>
      </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  );
};

export default LandingView;
