import dbPool from "../db";
import { IProfileRepository, User } from "../helpers/types";

export class ProfileRepository implements IProfileRepository {
  private readonly pool = dbPool.getPool();

  async getAllProfiles(): Promise<User[]> {
    const rows = (await this.pool.query("SELECT * from profile")).rows;
    return rows.map((row) => ({
      id: row.id,
      username: row.name,
      email: row.email,
      hobby: row.hobby,
    }));
  }

  async getProfileById(userId: string): Promise<User> {
    const rows = await this.pool.query(
      "SELECT * from profile where uuid = $1",
      [userId]
    );
    const row = rows.rows[0];
    if (!row) {
      throw new Error("User not found");
    }
    return {
      id: row.id,
      username: row.name,
      email: row.email,
      hobby: row.hobby,
    };
  }

  async createProfile(user: User): Promise<{ id: string }> {
    const query =
      "INSERT INTO profile(uuid, name, email, hobby) VALUES($1, $2, $3, $4)";
    await this.pool.query(query, [
      user.id,
      user.username,
      user.email,
      user.hobby,
    ]);
    return { id: user.id };
  }
}
