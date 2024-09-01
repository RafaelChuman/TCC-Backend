import { v4 as uuidV4 } from "uuid";
import { Entity, CreateDateColumn,  PrimaryColumn, ManyToOne, Column, OneToMany} from "typeorm";
import { OrderAndItems } from "../OrderAndItems/OrderAndItems";

@Entity("Item")
export class Item {

    @PrimaryColumn()
    id: string

    @Column()
    type: string
    @Column()
    name: string
    @CreateDateColumn()
    createdAt: Date
    @Column({default:false})
    deleted: boolean
    @CreateDateColumn()
    updated: Date


    @OneToMany(()=>OrderAndItems, (orderandItems)=> orderandItems.item)
    orderAndItems: OrderAndItems[]

    // @ManyToOne(()=>Group, group => group.RescueGroup)
    // Group: Group;

    // @ManyToOne(()=>User, user => user.RescueGroup)
    // User: User;

    constructor(){
        if(!this.id)
        {
            this.id = uuidV4();
        }
    }

}



