import { Button, ClickAwayListener } from "@material-ui/core";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { CloseIcon } from "../../icons/CloseIcon";
import { isServer } from "../../lib/isServer";
import { useConn } from "../../shared-hooks/useConn";
import { useTypeSafeQuery } from "../../shared-hooks/useTypeSafeQuery";

export const DashboardUser = () => {
    const { user } = useConn();

    const { data } = useTypeSafeQuery("getContent", {
        enabled: !isServer,
        refetchOnMount: "always",
    });
    const roles = data?.members.find(
        (m) => m.id === "481158632008974337"
    ).roles;

    const [showDetail, setShowDetail] = useState(false);
    const detail = useRef<HTMLDivElement>(null);

    const handleClick = (shouldOpen = false) => {
        if (shouldOpen) return setShowDetail(true);

        detail.current.classList.add("out");
        return setTimeout(() => setShowDetail(false), 200);
    };

    return (
        <div className="dashboard-user-ui-component">
            {showDetail ? (
                <ClickAwayListener onClickAway={() => handleClick()}>
                    <div className="detail" ref={detail}>
                        <Button
                            className="close on-bg-alt"
                            onClick={() => handleClick(false)}
                        >
                            <CloseIcon />
                        </Button>

                        <section className="roles">
                            {roles.map((r) => (
                                <article
                                    style={{ borderColor: r.color }}
                                    key={r.id}
                                >
                                    <div style={{ background: r.color }}></div>
                                    <h3>{r.name}</h3>
                                </article>
                            ))}
                        </section>

                        <Link href="/logout">
                            <Button className="logout">
                                <div className="content">
                                    <h3>Logout</h3>
                                    <img src="assets/icons/logout.svg" />
                                </div>
                            </Button>
                        </Link>
                    </div>
                </ClickAwayListener>
            ) : null}

            <Button
                className="on-card"
                onClick={() => handleClick(!showDetail)}
            >
                <div className="user">
                    <img className="avatar" src={user.avatarUrl} />
                    <h2>{user.name}</h2>
                    <h4>{user.tag}</h4>
                </div>
            </Button>
        </div>
    );
};
