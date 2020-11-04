import "./styles/App.css";
import data from "./data";
import CustomTable from "./components/CustomTable/CustomTable";

function App() {
  return (
    <div className="App">
      <CustomTable
        data={data.body}
        headers={data.headers}
        onItemClick={(item) => console.log(item)}
        onRemoveItems={(items) => console.log(items)}
        onFilter={(...items) => console.log(items)}
      />
    </div>
  );
}

export default App;
