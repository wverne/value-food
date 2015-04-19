/* global $ */

function setStickySidebar() {
    $("#sidebar-sticky-wrapper").sticky({ topSpacing: 20 });
}

function initInteraction(metrics) {

    var metricWeights = initMetricWeights(metrics);

    $(".metric-slider").on('change.fndtn.slider', function () {
        var valueId = $(this).attr('value-id');
        var metricId = $(this).attr('metric-id');
        var weight = parseInt($(this).attr('data-slider'));
        metricWeights[valueId][metricId] = weight;
        updateResults(metricWeights);
    });
}

function initMetricWeights(metrics) {
    var metricWeights = {};
    for (var value in metrics) {
        if (metrics.hasOwnProperty(value)) {
            metricWeights[value] = {};
            for (var i = 0; i < metrics[value].length; i++) {
                metricWeights[value][metrics[value][i]] = 50;
            }
        }
    }
    return metricWeights;
}

function updateResults(metricWeights) {
    var avgRaw = {};
    var totalAvgRaw = 0;

    // Calculate value-level scores
    for (var value in metricWeights) {
        if (metricWeights.hasOwnProperty(value)) {

            avgRaw[value] = 0;

            var numMetrics = Object.keys(metricWeights[value]).length;

            for (var metric in metricWeights[value]) {
                if (metricWeights[value].hasOwnProperty(metric)) {
                    avgRaw[value] += metricWeights[value][metric];
                }
            }

            if (numMetrics > 0) {
                avgRaw[value] /= numMetrics;
                totalAvgRaw += avgRaw[value];
            }

        }
    }

    // Update sidebar
    for (value in avgRaw) {
        if (avgRaw.hasOwnProperty(value)) {

            var thisWeight = avgRaw[value] / totalAvgRaw;
            thisWeight *= 100;
            thisWeight = Math.round(thisWeight);

            $(".your-values-progress[value-id=" + value +
                "] > span.meter").width(thisWeight + "%");

        }
    }
}
