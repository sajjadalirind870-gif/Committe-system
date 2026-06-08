
import { createContext ,useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('user');
        return saved? JSON.parse(saved): null;
    });

    const [admins, setAdmins] = useState(() => {
        const saveAdmins = localStorage.getItem('admins');
        return saveAdmins? JSON.parse(saveAdmins) : []
    })

    const [groups, setGroups] = useState(() => {
        const savedGroups = localStorage.getItem('groups');
        return savedGroups? JSON.parse(savedGroups) : [];
    })

    const [users, setUsers] = useState(() => {
        const saved = localStorage.getItem('users');
        return saved? JSON.parse(saved): [];
    });


    const addUser = (userData) => {
        const newUser = {...userData, createdBy: user.id,id:Date.now(), pending:0}
        const updated = [...users, newUser];
        setUsers(updated)
        localStorage.setItem('users', JSON.stringify(updated))
    }


    const deleteUser = (id) => {
        const updated = users.filter((user) => user.id !== id);
        setUsers(updated);
        localStorage.setItem('users', JSON.stringify(updated))
    };

const blockUser = (id) => {
    const updated = users.map((user) =>
        user.id === id
            ? { ...user, status: user.status === 'active' ? 'blocked' : 'active' }
            : user
    )
    setUsers(updated)
    localStorage.setItem('users', JSON.stringify(updated))
}
  
    const login = (userData) => {
     localStorage.setItem('user', JSON.stringify(userData));
         setUser(userData);
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');

    }

    const addAdmin = (adminData) => {
        const newAdmin = {...adminData, id:Date.now(), status:'active'}
        const updatedAdmins = [...admins, newAdmin];
        setAdmins(updatedAdmins);
        localStorage.setItem('admins', JSON.stringify(updatedAdmins));
    }

    const deleteAdmin = (id) => {
        const updated = admins.filter((admin) => 
        admin.id !== id);
        setAdmins(updated);
        localStorage.setItem('admins', JSON.stringify(updated));
    }


    const blockAdmin = (id) => {
        const updated = admins.map((admin) => {
            return admin.id === id? {...admin, status:admin.status === 'active'? 'blocked': 'active'} : admin
        })

        setAdmins(updated);
        localStorage.setItem('admins', JSON.stringify(updated));
    }


    const addGroup = (groupData) => {
        const newGroup = {...groupData, id:Date.now(), createdBy: user.id,  status: 'pending' , cycleStart:null}
        const updatedGroups = [...groups, newGroup];
        setGroups(updatedGroups);
        localStorage.setItem('groups', JSON.stringify(updatedGroups));
    }

const makePayment = (userId) => {
    const updatedUser = users.map((u) => {
        if(u.id == userId) {
            const userGroup = groups.find((g) => g.id == u.groupId && g.status === 'active')
            let userPending = u?.pending || 0;
            const totalDue = userPending + (userGroup.cycleDays * userGroup.dailyPayment);
            const effectiveDaily = totalDue / userGroup.cycleDays;
            
        
            let newPending = userPending - effectiveDaily;
            if (newPending < 0) newPending = 0;
            
            const newPayment = {
                id: Date.now(),
                amount: effectiveDaily,
                date: new Date().toLocaleDateString(),
                status: 'paid',
                phaseNumber: userGroup.currentPhase
            }
            return { 
                ...u, 
                payments: [...u.payments, newPayment],
                pending: newPending   
            }
        }
        return u;
    })
    setUsers(updatedUser)
    localStorage.setItem('users', JSON.stringify(updatedUser))
}


const deleteGroup = (id) => {
 
    const updatedGroups = groups.filter((g) => g.id != id)
    setGroups(updatedGroups)
    localStorage.setItem('groups', JSON.stringify(updatedGroups))

  
    const updatedUsers = users.map((u) => 
        u.groupId == id ? {...u, groupId: ''} : u
    )
    setUsers(updatedUsers)
    localStorage.setItem('users', JSON.stringify(updatedUsers))
}





const tokenDraw = (groupId) => {

    const group = groups.find((g) => g.id == groupId);

    if(!group) return null;

    const groupUsers = users.filter((u) => u.groupId == groupId);
    const required = group.cycleDays;
    
    const eligable = groupUsers.filter((u) => {
        const phasePayment = u.payments.filter((p) => p.phaseNumber == group.currentPhase)
        return phasePayment.length >= required && (u.hasWon === false || u.hasWon === undefined)
    })


    if(eligable.length === 0) return null;

    const winner = eligable[Math.floor(Math.random() * eligable.length)];
    
    const updatedUsers = users.map((u) => 
    u.id == winner.id? {...u, hasWon:true}: u
    )

    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    return winner;


}




const startGroup = (groupId) => {
    const updatedGroups = groups.map((g) => {
        return g.id == groupId? {...g, status: 'active', currentPhase:1, cycleStart: new Date().toISOString() }: g
    })

    setGroups(updatedGroups);
    localStorage.setItem('groups', JSON.stringify(updatedGroups))
}


const getdaysPassed = (groupId) => {
    const group = groups.find((g) => g.id == groupId);
    if(!group || !group.cycleStart) return 0;
    const cycleStart = new Date(group.cycleStart);
    const newDate = new Date();
     const daysPassed = Math.floor((newDate - cycleStart) / (1000 * 60 * 60 * 24));
     return daysPassed + 1;
}


const isCycleComplete = (groupId) => {
    const group = groups.find((g) => g.id == groupId);
    if(!group) return false;
    return getdaysPassed(groupId) >= Number(group.cycleDays) - 1;
}

const nextPhase = (groupId) => {
    const group = groups.find((g) => g.id == groupId);
    if(!group) return

  const updatedUsers = users.map((u) => {
    if(u.groupId != groupId) return u;
    const phasePayments = u.payments.filter((p) => Number( p.phaseNumber) === Number(group.currentPhase));
    const paidDays = phasePayments.length;
    const required = group?.cycleDays - paidDays;
    const userPending = (required >  0) ? (required * group.dailyPayment) : 0;
    const newPending = (u.pending || 0) + userPending;
    return {...u, pending: newPending}
  })

    const updatedGroup = groups.map((g) => (
        g.id == groupId? {...g, currentPhase: g.currentPhase + 1, cycleStart: new Date().toISOString() } : g
    ))
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setGroups(updatedGroup);
    localStorage.setItem('groups', JSON.stringify(updatedGroup))
}


    return(
        <AuthContext.Provider value={{user, login, logout, admins, addAdmin, deleteAdmin, blockAdmin, groups, addGroup, deleteGroup, addUser,users, deleteUser, blockUser, makePayment, tokenDraw, startGroup, getdaysPassed,isCycleComplete, nextPhase}}>
            {children}
        </AuthContext.Provider>
    )
}


export function useAuth() {
    return useContext(AuthContext);
}
