import Header from "../components/Header";
import TodoList from "../components/TodoList";
import AddTodo from "../components/AddTodo"; 
import Footer from "../components/Footer";
import { GlobalProvider } from "../context/GlobalState";

function IndexPage() {
  return (
    <GlobalProvider>
      <div className="App">
        <div className="container">
          <Header />
          <AddTodo />
          <TodoList />
        </div>
        <Footer />
      </div>
    </GlobalProvider>
  );
}

export default IndexPage;
