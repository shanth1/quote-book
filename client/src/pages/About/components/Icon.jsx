import styles from "../styles.module.scss";

import docker from "../assets/docker.svg";
import express from "../assets/express.svg";
import graphql from "../assets/graphql.svg";
import javascript from "../assets/javascript.svg";
import mongo from "../assets/mongo.svg";
import node from "../assets/node.svg";
import react from "../assets/react.svg";
import tailwind from "../assets/tailwind.svg";
import apollo from "../assets/apollo.svg";
import nginx from "../assets/nginx.svg";
import jwt from "../assets/jwt.svg";
import git from "../assets/git.svg";

export const Icon = ({ name }) => {
    let src = undefined;
    switch (name) {
        case "docker":
            src = docker;
            break;
        case "express":
            src = express;
            break;
        case "graphql":
            src = graphql;
            break;
        case "apollo":
            src = apollo;
            break;
        case "nginx":
            src = nginx;
            break;
        case "jwt":
            src = jwt;
            break;
        case "git":
            src = git;
            break;
        case "javascript":
            src = javascript;
            break;
        case "mongo":
            src = mongo;
            break;
        case "node":
            src = node;
            break;
        case "react":
            src = react;
            break;
        case "tailwind":
            src = tailwind;
            break;

        default:
            break;
    }
    return (
        <div className="w-full flex justify-center items-center">
            <img className={styles.icon} src={src} alt="icon" />
        </div>
    );
};
