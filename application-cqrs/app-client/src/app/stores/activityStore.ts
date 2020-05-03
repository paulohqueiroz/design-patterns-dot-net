import { observable } from "mobx";
import { createContext } from "react";

class ActivityStore {
    @observable Title = "hello from mob"
}

export default createContext(new ActivityStore());