import { categories } from "./categories";
import { Directory } from "./components/directory/directory.component";

function App() {
  return <Directory categories={categories} />;
}
export default App;
