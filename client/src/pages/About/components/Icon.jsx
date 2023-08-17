import styles from "../styles.module.scss";

import docker from "../assets/docker.svg";
import express from "../assets/express.svg";
import graphql from "../assets/graphql.svg";
import javascript from "../assets/javascript.svg";
import mongo from "../assets/mongo.svg";
import node from "../assets/node.svg";
import react from "../assets/react.svg";
import tailwind from "../assets/tailwind.svg";

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
            <img className={styles.icon} src={src} alt="#" />
        </div>
    );
};
