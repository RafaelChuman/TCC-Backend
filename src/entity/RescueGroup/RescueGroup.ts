import { v4 as uuidV4 } from "uuid";
import { Entity, CreateDateColumn,  PrimaryColumn, ManyToOne} from "typeorm";
import { Group } from "../Group/Group";
import { User } from "../User/User";

@Entity("RescueGroup")
export class RescueGroup {

    @PrimaryColumn()
    id: string

    @ManyToOne(()=>Group, group => group.RescueGroup)
    Group: Group;

    @ManyToOne(()=>User, user => user.RescueGroup)
    User: User;

    @CreateDateColumn()
    createdAt: Date

    constructor(){
        if(!this.id)
        {
            this.id = uuidV4();
        }
    }

}



