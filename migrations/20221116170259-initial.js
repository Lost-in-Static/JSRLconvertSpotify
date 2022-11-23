"use strict";

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  db.createTable("playlists", {
    id: { type: "int", primaryKey: true, autoIncrement: true },
    name: "string",
  });

  db.createTable("tracks", {
    id: { type: "int", primaryKey: true, autoIncrement: true },
    name: "string",
    artist: "string",
    uri: "string",
    playlistid: {
      type: "int",
      foreignKey: {
        name: "tracks_playlistid_playlists_id_fk",
        table: "playlists",
        rules: {},
        mapping: "id",
      },
    },
  });

  return null;
};

exports.down = function (db) {
  db.dropTable("tracks");
  db.dropTable("playlists");

  return null;
};

exports._meta = {
  version: 1,
};
