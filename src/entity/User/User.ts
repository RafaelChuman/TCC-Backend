import { v4 as uuidV4 } from "uuid";
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, PrimaryColumn, ManyToOne, OneToMany} from "typeorm";
import { Group } from "../Group/Group";
import { RescueGroup } from "../RescueGroup/RescueGroup";

@Entity("User")
export class User {

    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @Column()
    userName: string

    @Column()
    password: string

    @Column()
    imgPath: string

    @Column()
    email: string

    @Column()
    celular: number

    @Column()
    telegram: string

    @Column()
    isAdmin: boolean

    @CreateDateColumn()
    createdAt: Date

    @OneToMany(()=> Group, (group) => group.User)
    Group: Group[]

    @OneToMany(()=> RescueGroup, (rescueGroup) => rescueGroup.User)
    RescueGroup: RescueGroup[]



    constructor(){
        if(!this.id)
        {
            this.id = uuidV4();
            this.isAdmin = false;
        }
    }

}



