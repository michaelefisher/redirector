const {Logging} = require('@google-cloud/logging');

const projectId = process.env.GCP_PROJECT || process.env.GCLOUD_PROJECT;
const logName = 'default';

const logging = new Logging({projectId});
const log = logging.log(logName);

exports.redirector = function redirectFunc (req, res) {

  const request = async (req, res) => {
    const metadata = {
      resource: { type: 'global' },
      severity: 'INFO',
    }

    const requestText = `Redirect from: ${req}`;
    const logEntry = log.entry(metadata, requestText);
    await log.write(logEntry);

    res.set('Location', 'https://michaelfisher.org');
    res.status(301);
    res.end();
  }

  request(req, res);

};

