import { Button } from "@material-ui/core"
import React, { useRef, useState } from "react"
import { CloseIcon } from "../../../icons/CloseIcon";
import { User } from "../../../modules/ws/client";

// const roles = data.members.find(m => m.id === "481158632008974337").roles;

interface DashboardUserProps {
    user: User;
    roles: any;
}

export const DashboardUser: React.FC<DashboardUserProps> = ({ user, roles }) => {
    const [showDetail, setShowDetail] = useState(false);
    const detail = useRef<HTMLDivElement>(null);

    const handleClick = (shouldOpen = false) => {
        if (shouldOpen) return setShowDetail(true);

        detail.current.classList.add("out");
        return setTimeout(() => setShowDetail(false), 200)
    }

    return (
        <div className="dashboard-user-ui-component">
            { showDetail ?
                <div className="detail" ref={detail}>
                    <Button className="on-bg-alt" onClick={() => handleClick(false)}>
                        <CloseIcon />
                    </Button>

                    <section className="roles">
                        {roles.map(r => (
                            <article style={{ borderColor: r.color }} key={r.id}>
                                <div style={{ background: r.color }}></div>
                                <h3>{r.name}</h3>
                            </article>
                        ))}
                    </section>
                </div> : null}

            <Button className="on-card" onClick={() => handleClick(!showDetail)}>
                <div className="user">
                    <img src={user.avatarUrl} />
                    <h2>{user.name}</h2>
                    <h4>{user.tag}</h4>
                </div>
            </Button>
        </div>
    )
}