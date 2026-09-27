#!/bin/bash
source /home/cipheroot/allcode/baja/.venv/bin/activate

echo "Creating dataset..."
kaggle datasets create -p /home/cipheroot/allcode/baja/kaggle_dataset

echo "Waiting for dataset to be processed..."
sleep 15

echo "Pushing kernel..."
kaggle kernels push -p /home/cipheroot/allcode/baja/kaggle_kernel

echo "Waiting for kernel to finish..."
STATUS="queued"
while [ "$STATUS" != "complete" ] && [ "$STATUS" != "error" ]; do
    sleep 10
    STATUS=$(kaggle kernels status cipheroot/baja-stp-to-glb | grep -i "status" | awk '{print $2}' | tr -d '\"')
    echo "Current status: $STATUS"
    if [ -z "$STATUS" ]; then
        STATUS=$(kaggle kernels status cipheroot/baja-stp-to-glb)
        echo "Raw status: $STATUS"
    fi
done

echo "Kernel finished with status: $STATUS"

if [ "$STATUS" = "complete" ]; then
    echo "Downloading output..."
    kaggle kernels output cipheroot/baja-stp-to-glb -p /home/cipheroot/allcode/baja/public
    echo "Done!"
else
    echo "Kernel failed."
fi
