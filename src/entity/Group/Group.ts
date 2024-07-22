import { v4 as uuidv4 } from "uuid";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { IoT } from "../IoT/IoT";
import { User } from "../User/User";
import { RescueGroup } from "../RescueGroup/RescueGroup";

@Entity("Group")
export class Group
{

    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @Column()
    temperature: number;

    @Column()
    humidity: number;

    @Column()
    noBreak: number;

    @ManyToOne(() => User, (user) => user.Group)
    @JoinColumn({name:"userId"})
    User: User;

    @OneToMany(()=> IoT, (iot) => iot.Group)
    IoT: IoT[]

    @OneToMany(() => RescueGroup, rescueGroup => rescueGroup.Group)
    RescueGroup: RescueGroup[];

    @CreateDateColumn()
    createdAt: Date
  
    constructor()
    {
        if(!this.id)
        {
            this.id = uuidv4();
        }
    }
}