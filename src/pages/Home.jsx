import CategoryList from "../components/CategoryList"
import ClassList from "../components/ClassList"
import MainBackground from "../components/MainBackground"

function Home() {

  return (
    <div className="w-full">
      <MainBackground />
      <ClassList />
      <CategoryList />
    </div>
  )
}

export default Home