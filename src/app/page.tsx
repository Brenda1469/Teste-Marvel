import Hero  from "./_components/home";
import Characters from "./_components/Characters"; 
import GlobalStyle from "./style/global";

const App: React.FC = () => {
  return (
    <main>

      <Hero />
      <Characters />
      <GlobalStyle/>

    </main>
  );
};

export default App;
