import react, {Fragment} from "react"
import Navigation from "./components/layout/Navigation"
import HeaderBanner from "./components/layout/HeaderBanner"
import TextBanner from "./components/layout/TextBanner"
import Menu from "./components/layout/Menu"
import ConfirmationForm from "./components/order-confirmation-form/ConfirmationForm"

function App() {
    return (
    <Fragment>
      <Navigation />
      <HeaderBanner />
      <TextBanner />
      <Menu />
    </Fragment>
  );
}

export default App;
