import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Item } from "../Item/Item";
import { Order } from "../Order/Order";


@Entity("OrderAndItem")
export class OrderAndItem {

    @PrimaryColumn()
    id: string
    @Column()    
    quantity: number
    @Column()
    price: number
    @Column()
    discount: number
    @CreateDateColumn()
    createdAt: Date
    @Column({default:false})
    deleted: boolean
    @CreateDateColumn()
    updated: Date

    @ManyToOne( () => Item, (item)=> item.orderAndItem)
    @JoinColumn({name:"itemId"})
    item: Item

    @ManyToOne( ()=> Order, (order)=> order.orderAndItem)
    @JoinColumn({name:"orderId"})
    order: Order

    
    constructor() {
        if (this.id === undefined) {
            this.id = uuidv4();
        }
    }
}