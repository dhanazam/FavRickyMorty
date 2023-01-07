import Reactotron from "reactotron-react-native";
import { NativeModules } from "react-native";
import { reactotronRedux } from 'reactotron-redux'

const host = NativeModules.SourceCode.scriptURL.split("://")[1].split(":")[0];
const reactotron = Reactotron.configure({ host }).useReactNative().connect().use(reactotronRedux());

export default reactotron;
