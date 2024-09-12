import {createClient} from "contentful";

import styles from './users.module.scss';

export default function Users({ users }) {
  return (
    <div className="wrapper">
      <div className="users-list">
        <h3>Users list</h3>
        {users && users.map(user => (
          <div className={styles.userProfile} key={user.sys.id}>
            <span>{user.fields.firstName} {user.fields.lastName}</span>
            <span><a href={`mailto:${user.fields.email}`}>{user.fields.email}</a></span>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const res = await client.getEntries({
    content_type: 'users',
  });

  if(!res.items) {
    return { notFound: true };
  }

  return {
    props: {
      users: res.items,
    }
  }
}
