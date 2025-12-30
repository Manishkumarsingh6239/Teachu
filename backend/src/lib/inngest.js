import {Inngest} from "inngest";
import { ConnectDB } from "./db.js";
import User from "../models/User.js";
import { deleteStreamUser, upsertUser } from "./stream.js";

export const inngest = new Inngest({ id: "teachu" });

const syncUser = inngest.createFunction(
    { id: "sync-user" },
    { event: "clerk/user.created" },
    async ({ event }) => {
        await ConnectDB();

        const { id, email_addresses, first_name, last_name, image_url } = event.data;

        const newUser = new User({
            clerkId: id,
            email: email_addresses[0]?.email_address,
            username: `${first_name || ""} ${last_name || ""}`,
            profileImage: image_url
        })

        await User.create(newUser);

        await upsertUser({
            id: newUser.clerkId.toString(),
            name: newUser.username,
            image: newUser.profileImage,
        });

    })

const deleteUserFromDB = inngest.createFunction(
    { id: "delete-user-from-dp" },
    { event: "clerk/user.deleted" },
    async ({ event }) => {
        await ConnectDB();

        const { id } = event.data;
        await User.deleteOne({ clerkId: id });

        await deleteStreamUser(id.toString());

    })

export const functions = [syncUser, deleteUserFromDB];