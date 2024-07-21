import { AppBar } from "../components/AppBar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"

export const Dashboard = () => {
    return <div>
        <div>
            <AppBar />
            <div className="ml-4 mr-4">
                <Balance />
                <Users />
            </div>
        </div>
    </div>
}