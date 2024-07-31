#!/bin/bash

# Deploy only one firebase function
output=$(npx firebase deploy --only functions:helloWorld 2>&1)

if echo "$output" | grep -q "Deploy complete"; then
  echo "Deployment successful."
else
  echo "$output" | grep "Error" > /dev/null
  if [ $? -eq 0 ]; then
    echo "Deployment failed with an error."
    echo "$output"
  else
    echo "Deployment completed with ignorable errors."
  fi
fi
