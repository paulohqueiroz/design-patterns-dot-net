import { observable, action, computed } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IActivity } from "../../models/IActivity";
import agent from "../services/agent";

class ActivityStore {
    @observable activities: IActivity[] = [];
    @observable loadingInitial = false;
    @observable submitting = false;
    @observable selectedActivity: IActivity | undefined;
    @observable editMode = false;
    @observable activityRegistry = new Map();
    @observable target = '';


    @computed get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a,b) => Date.parse(a.Date) - Date.parse(b.Date));
    }

    @action loadActivities = () => {
        this.loadingInitial = true;
        agent.Activities.list()
            .then((activities) => {
                activities.map(activity => {
                    this.activityRegistry.set(activity.Id, activity);
                });
            })
            .finally(() => {
                this.loadingInitial = false;
            });
    }

    @action selectActivity = (id: string) => {
        this.selectedActivity =  this.activityRegistry.get(id);
        this.editMode = false;
    }

    @action openEditForm = (Id: string) => {
        this.selectedActivity = this.activityRegistry.get(Id);
        this.editMode = true;
    }

    @action cancelSelectedActivity = () => {
        this.selectedActivity = undefined;
    }

    
    @action cancelFormOpen= () => {
       this.editMode = false;
    }


    @action createActivity = (activity: IActivity) => {
        this.submitting = true;
        agent.Activities.create(activity).then(() => {
            this.activityRegistry.set(activity.Id, activity);
            this.editMode = false;
        })
        .then(() => { })
        .finally(() => this.submitting = false);
    }

    @action editActivity = (activity: IActivity) => {
        this.submitting = true;
        agent
        .Activities
        .update(activity)
        .then(() => {
            this.activityRegistry.set(activity.Id, activity);
            this.editMode = false;
            this.selectedActivity = activity;
        })
        .finally(() => this.submitting = false);
    }


    @action deleteActivity = (event: SyntheticEvent<HTMLButtonElement>, Id: string)  => {
      this.submitting = true;
      this.target = event.currentTarget.name; 
        agent
        .Activities
        .delete(Id).then(()=>{
          this.activityRegistry.delete(Id);
        }).then(() =>{
            this.submitting = false;
            this.target = '';
        });  
    }

    @action openCreateForm = () => {
        this.editMode = true;
        this.selectedActivity = undefined;
    }
}

export default createContext(new ActivityStore());