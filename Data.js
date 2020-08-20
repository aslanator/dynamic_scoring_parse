export default class Data {
    get id() {
        return this._id;
    }

    constructor(id) {
        this._id = id.replace(/\$id/g, '{id}');
    }
}