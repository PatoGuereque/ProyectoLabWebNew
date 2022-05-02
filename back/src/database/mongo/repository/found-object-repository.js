import { FoundObject } from '../models/found-object';

const createFoundObject = ({
  campus,
  location,
  category,
  reportingUser,
  imageBase64,
  status,
  dateFound,
}) =>
  FoundObject.create({
    campus,
    location,
    category,
    reportingUser,
    imageBase64,
    status,
    dateFound,
  });

const getFoundObjects = () => FoundObject.find();
const getObjectWithId = (id) => FoundObject.findById(id);

export { createFoundObject, getFoundObjects, getObjectWithId };
