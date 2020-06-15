import { observable, action, computed, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IActivity } from "../../models/IActivity";
import agent from "../services/agent";

class ActivityStore {
    @observable activities: IActivity[] = [];
    @observable loadingInitial = false;
    @observable submitting = false;
    @observable activity: IActivity | undefined;
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
        this.activity =  this.activityRegistry.get(id);
        this.editMode = false;
    }

    @action openEditForm = (Id: string) => {
        this.activity = this.activityRegistry.get(Id);
        this.editMode = true;
    }

    @action cancelSelectedActivity = () => {
        this.activity = undefined;
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
            this.activity = activity;
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
        this.activity = undefined;
    }

    @action loadActivity = async (Id: string) => {
        let activity  = this.getActivity(Id);
        if(activity) {
            this.activity = activity;
        } else {
            this.loadingInitial = true;
            try {
                activity = await agent.Activities.details(Id);
                runInAction('getting activity', () => {
                    this.activity = activity;
                    this.loadingInitial = false;
                })
            } catch (error) {
                runInAction('getting activity error', () => {
                    this.loadingInitial = false;
                })
                console.log(error);
            }

        }
    }

    getActivity = (Id: string) =>{
       return this.activityRegistry.get(Id);
    }

}

export default createContext(new ActivityStore());