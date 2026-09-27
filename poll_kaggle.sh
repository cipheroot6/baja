#!/bin/bash
source /home/cipheroot/allcode/baja/.venv/bin/activate
STATUS="queued"
echo "Polling kernel status..."
while true; do
    RAW=$(kaggle kernels status cipheroot/baja-stp-to-glb)
    echo "Raw status: $RAW"
    if [[ "$RAW" == *"COMPLETE"* ]]; then
        echo "Finished!"
        break
    elif [[ "$RAW" == *"ERROR"* ]] || [[ "$RAW" == *"CANCELLED"* ]]; then
        echo "Failed!"
        break
    fi
    sleep 10
done

if [[ "$RAW" == *"COMPLETE"* ]]; then
    echo "Downloading output..."
    kaggle kernels output cipheroot/baja-stp-to-glb -p /home/cipheroot/allcode/baja/public
    echo "Done!"
fi
