import { GroupAutorizationView } from "./group-autorization-view";

export class GroupAutoriozationPost{
       name: string='';

       constructor(obj:GroupAutorizationView){
              this.name = obj.name;
       }
}