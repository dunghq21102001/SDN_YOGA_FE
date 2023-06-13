import { useSelector } from "react-redux"
import CategoryList from "../components/CategoryList"
import ClassList from "../components/ClassList"
import MainBackground from "../components/MainBackground"

function Home() {
  const auth = useSelector(store => store.auth)

  const Log = () => {
    console.log(auth);
  }
  return (
    <div className="w-full">
      <MainBackground />
      <ClassList />
      <button onClick={Log} className="main-btn">click</button>
      <CategoryList />
    </div>
  )
}

export default Home