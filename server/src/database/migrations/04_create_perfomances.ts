import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('performances', table=> {
        table.string('teacher_performance').notNullable();
        table.string('teacher_name').notNullable();
    })
}

export async function down(knex: Knex){
    return knex.schema.dropTable('performances');
}