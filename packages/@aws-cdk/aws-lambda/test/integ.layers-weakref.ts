/// !cdk-integ *

import * as cdk from '@aws-cdk/core';
import * as path from 'path';
import * as lambda from '../lib';

const app = new cdk.App();

const layerStack = new cdk.Stack(app, 'integ-layers-weakref-layerstack');

const layer = new lambda.LayerVersion(layerStack, 'Layer', {
  code: lambda.Code.fromAsset(path.join(__dirname, 'layer-code')),
});

const functionStack = new cdk.Stack(app, 'integ-layers-weakref-functionstack');

new lambda.Function(functionStack, 'Function', {
  code: new lambda.InlineCode('foo'),
  handler: 'index.handler',
  runtime: lambda.Runtime.NODEJS_12_X,
  layers: [ layer ],
});

app.synth();
