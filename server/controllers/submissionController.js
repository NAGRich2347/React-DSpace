const dspaceService = require('../services/dspaceService');

exports.uploadFile = async (req, res, next) => {
  try {
    // Validate file presence
    if (!req.files || !req.files.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }
    const file = req.files.file;
    // Allowed MIME types
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];
    if (!allowedTypes.includes(file.mimetype)) {
      return res.status(400).json({ error: 'Invalid file type.' });
    }
    if (file.size > 10 * 1024 * 1024) {
      return res.status(400).json({ error: 'File size exceeds 10MB.' });
    }
    // Sanitize filename
    const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    const result = await dspaceService.uploadFile({ fileData: file.data, filename: safeName });
    res.status(200).json({ id: result.id });
  } catch (err) { next(err); }
};

exports.submitMetadata = async (req, res, next) => {
  try {
    await dspaceService.addMetadata(req.body.id, req.body.metadata);
    res.status(204).end();
  } catch (err) { next(err); }
};

exports.reviewSubmission = async (req, res, next) => {
  try {
    const data = await dspaceService.getSubmission(req.params.id);
    res.status(200).json(data);
  } catch (err) { next(err); }
};

exports.publishSubmission = async (req, res, next) => {
  try {
    await dspaceService.publish(req.params.id);
    res.status(200).json({ published: true });
  } catch (err) { next(err); }
};