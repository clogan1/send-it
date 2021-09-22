# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_09_22_185552) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.string "name"
    t.string "emoji"
  end

  create_table "contributors", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "user_card_id", null: false
    t.text "message"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "email"
    t.index ["user_card_id"], name: "index_contributors_on_user_card_id"
    t.index ["user_id"], name: "index_contributors_on_user_id"
  end

  create_table "roles", force: :cascade do |t|
    t.string "name"
  end

  create_table "templates", force: :cascade do |t|
    t.bigint "category_id", null: false
    t.string "name"
    t.string "art_url"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "artist_name"
    t.index ["category_id"], name: "index_templates_on_category_id"
  end

  create_table "user_cards", force: :cascade do |t|
    t.bigint "template_id", null: false
    t.bigint "user_id", null: false
    t.string "recipient_email"
    t.string "recipient_name"
    t.text "message"
    t.boolean "is_sent"
    t.datetime "schedule_send"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["template_id"], name: "index_user_cards_on_template_id"
    t.index ["user_id"], name: "index_user_cards_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "email"
    t.string "avatar_url"
    t.bigint "role_id", null: false
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["role_id"], name: "index_users_on_role_id"
  end

  add_foreign_key "contributors", "user_cards"
  add_foreign_key "contributors", "users"
  add_foreign_key "templates", "categories"
  add_foreign_key "user_cards", "templates"
  add_foreign_key "user_cards", "users"
  add_foreign_key "users", "roles"
end
