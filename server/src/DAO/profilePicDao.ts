import {db_connection} from '../../config'

interface User {
    user_id: string;
    platform_type: string;
    email: string;
    displayName: string;
    nickName: string;
    verified_email: number;
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
    profilePic: string | null;
}

class profilePicDao{
    static async updateProfilePic(profilePicUrl:string, user_id:string): Promise<string | null>{
        const {rows}=await db_connection.query(
            `UPDATE users SET profile_pic = $1 WHERE user_id = $2 RETURNING profile_pic`, 
            [profilePicUrl, user_id]
        );
        return rows[0].profilePic;
    }
}

export default profilePicDao;

