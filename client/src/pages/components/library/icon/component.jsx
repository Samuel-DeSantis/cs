import IconWrapper from "./wrapper"
import { icons } from "./icons"

const Copy = () => <IconWrapper path={ icons.copy } className='w-8 h-8 hover:text-blue-500' />
const Edit = () => <IconWrapper path={ icons.edit } className='w-8 h-8 hover:text-green-500' />
const Delete = () => <IconWrapper path={ icons.delete } className='w-8 h-8 hover:text-red-500' />
const Inbox = () => <IconWrapper path={ icons.inbox } className='w-6 h-6' />
const Account = () => <IconWrapper path={ icons.account } className='w-8 h-8' />
const Lists = () => <IconWrapper path={ icons.lists } className='w-10 h-10' />
const Meatballs = () => <IconWrapper path={ icons.meatballs } className='w-6 h-6' />

export { Copy, Edit, Delete, Inbox, Account, Lists, Meatballs }