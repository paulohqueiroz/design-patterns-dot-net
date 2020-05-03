import { observable, action } from "mobx";
import { createContext } from "react";
import { IActivity } from "../../models/IActivity";
import agent from "../services/agent";

class ActivityStore {
    @observable activities: IActivity[] = [];
    @observable loadingInitial = false;
    @observable submitting = false;
    @observable selectedActivity: IActivity | undefined;
    @observable editMode = false;

    @action loadActivities = () => {
        this.loadingInitial = true;
        agent.Activities.list()
            .then((activities) => {
                this.activities = activities
            })
            .finally(() => {
                this.loadingInitial = false;
            });
    }

    @action selectActivity = (id: string) => {
        this.selectedActivity = this.activities.find(item => item.Id === id);
        this.editMode = false;
    }

    @action createActivity = (activity: IActivity) => {
        this.submitting = true;
        agent.Activities.create(activity).then(() => {
            this.activities.push(activity);
            this.editMode = false;
        })
        .then(() => { })
        .finally(() => this.submitting = false);
    }

    @action openCreateForm = () => {
        this.editMode = true;
        this.selectedActivity = undefined;
    }
}

export default createContext(new ActivityStore());