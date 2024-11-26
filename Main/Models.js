import { uuid } from './Helper_Functions.js'
import { pool } from './database.js'

// Add Fail Handeling

class User {

    constructor(username, full_name, email, password, date_created, validated, profile_picture, id = uuid()) {
        this.id = id;
        this.username = username;
        this.full_name = full_name;
        this.email = email;
        this.password = password;
        this.date_created = date_created;
        this.validated = validated;
        this.profile_picture = profile_picture;
    }

    Insert() {
        pool.execute(`
            INSERT INTO user (id, username, full_name, email, password, date_created, validated, profile_picture)
            VALUES ('${this.id}', '${this.username}', '${this.full_name}', '${this.email}', '${this.password}', '${this.date_created}', ${this.validated}, ${this.profile_picture});
                `), (err, res) => { console.log(err); console.log(res) }
    }

    Update() {
        pool.execute(`
            UPDATE user
            SET username = '${this.username}', full_name = '${this.full_name}', email = '${this.email}', password =  '${this.password}', date_created = '${this.date_created}', validated = ${this.validated}, profile_picture = ${this.profile_picture}
            WHERE id = '${this.id}';
            `), (err, res) => { console.log(err); console.log('gotovo') }
    }

    Delete() {
        pool.execute(`
            DELETE FROM user WHERE id = '${this.id}'
            `), (err) => { console.error(err) }
    }

}

class Subject {

    constructor(name, details, creator, id = uuid()) {
        this.id = id;
        this.name = name;
        this.details = details;
        this.creator = creator;
    }

    Insert() {
        pool.execute(`
            INSERT INTO subject (id, name, details, creator)
            VALUES ('${this.id}', '${this.name}', '${this.details}', '${this.creator}');
                `), (err) => { console.log(err) }
    }

    Update() {
        pool.execute(`
            UPDATE subject
            SET name = '${this.name}', details = '${this.details}', creator = '${this.creator}'
            WHERE id = '${this.id}';
            `), (err, res) => { console.error(err) }
    }

    Delete() {
        pool.execute(`
            DELETE FROM subject WHERE id = '${this.id}';
            `), (err) => { console.error(err) }
    }
}

class Section {

    constructor(title, details, is_public, subject_id, id = uuid()) {
        this.id = id;
        this.title = title;
        this.details = details;
        this.is_public = is_public;
        this.subject_id = subject_id;
    }
    Insert() {
        pool.execute(`
            INSERT INTO section (id, title, details, is_public, subject_id)
            VALUES ('${this.id}', '${this.title}', '${this.details}', ${this.is_public}, ${this.subject_id});
                `),(err)=>console.error(err)
    }

    Update() {
        pool.execute(`
            UPDATE section
            SET title = '${this.title}', details = '${this.details}', is_public =  '${this.is_public}, subject_id = ${this.subject_id}'
            WHERE id = '${this.id}';
            `), (err, res) => { console.error(err) }
    }

    Delete() {
        pool.execute(`
            DELETE FROM section WHERE id = '${this.id}';
            `), (err) => { console.log(err) }
    }
}


class Note {

    constructor(title, content, section_id, id = uuid()) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.section_id = section_id;
    }

    Insert() {
        pool.execute(`
            INSERT INTO note (id, title, content, section_id)
            VALUES ('${this.id}', '${this.title}', '${this.content}', '${this.section_id}');
                `), (err, res) => { console.log(err); console.log(res) }
    }

    Update() {
        pool.execute(`
            UPDATE note
            SET title = '${this.title}', content = '${this.content}', section_id = '${this.section_id}'
            WHERE id = '${this.id}';
            `), (err, res) => { console.log(err); console.log('gotovo') }
    }

    Delete() {
        pool.execute(`
            DELETE FROM note WHERE id = '${this.id}'
            `), (err) => { console.error(err) }
    }

}

class Likes {

    constructor(user_id, subject_id) {
        this.id = user_id + subject_id
        this.user_id = user_id;
        this.subject_id = subject_id;
    }

    Insert() {
        pool.execute(`
            INSERT INTO likes (id, user_id, subject_id)
            VALUES ('${this.id}', '${this.user_id}', '${this.subject_id}');
                `), (err, res) => { console.log(err); console.log(res) }
    }

    Delete() {
        pool.execute(`
            DELETE FROM likes WHERE id = '${this.id}'
            `), (err) => { console.error(err) }
    }
}


class Saves {

    constructor(user_id, subject_id) {
        this.id = user_id + subject_id
        this.user_id = user_id;
        this.subject_id = subject_id;
    }

    Insert() {
        pool.execute(`
            INSERT INTO saves (id, user_id, subject_id)
            VALUES ('${this.id}', '${this.user_id}', '${this.subject_id}');
                `), (err, res) => { console.log(err); console.log(res) }
    }

    Delete() {
        pool.execute(`
            DELETE FROM saves WHERE id = '${this.id}'
            `), (err) => { console.error(err) }
    }
}

