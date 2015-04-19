/* global $ */

function setStickySidebar() {
    $("#sidebar-sticky-wrapper").sticky({ topSpacing: 20 });
}

function initInteraction(metrics, foods, siteNames) {

    var metricWeights = initMetricWeights(metrics);

    $(".metric-slider").on('change.fndtn.slider', function () {
        var valueId = $(this).attr('value-id');
        var metricId = $(this).attr('metric-id');
        var weight = parseInt($(this).attr('data-slider'));
        metricWeights[valueId][metricId] = weight;
        updateResults(metricWeights, foods, siteNames);
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

function updateResults(metricWeights, foods, siteNames) {
    var avgRaw = {};
    var totalAvgRaw = 0;

    // Initialize sites list
    var totalSites = {};
    for (var food in foods) {
        if (foods.hasOwnProperty(food)) {
            totalSites[food] = {};
            for (var site in foods[food]) {
                if (foods[food].hasOwnProperty(site)) {
                    totalSites[food][site] = 0.0;
                }
            }
        }
    }

    // Calculate value-level scores
    for (var value in metricWeights) {
        if (metricWeights.hasOwnProperty(value)) {

            avgRaw[value] = 0;

            var numMetrics = Object.keys(metricWeights[value]).length;

            for (var metric in metricWeights[value]) {
                if (metricWeights[value].hasOwnProperty(metric)) {

                    avgRaw[value] += metricWeights[value][metric];

                    for (var food in foods) {
                        if (foods.hasOwnProperty(food)) {
                            for (var site in foods[food]) {
                                if (foods[food].hasOwnProperty(site)) {
                                    totalSites[food][site] +=
                                        metricWeights[value][metric] *
                                        foods[food][site][metric] /
                                        numMetrics;
                                }
                            }
                        }
                    }

                }
            }

            if (numMetrics > 0) {
                avgRaw[value] /= numMetrics;
                totalAvgRaw += avgRaw[value];
            }

        }
    }

    // Update "Your Values"
    for (value in avgRaw) {
        if (avgRaw.hasOwnProperty(value)) {

            var thisWeight = avgRaw[value] / totalAvgRaw;
            thisWeight *= 100;
            thisWeight *= 1.5;  // Makes bar wider
            thisWeight = Math.round(thisWeight);

            $(".your-values-progress[value-id=" + value +
                "] > span.meter").width(thisWeight + "%");

        }
    }

    // Rank sites
    var siteRanks = {};
    for (var food in foods) {
        if (foods.hasOwnProperty(food)) {
            siteRanks[food] = [];
            for (var site in foods[food]) {
                if (foods[food].hasOwnProperty(site)) {
                    siteRanks[food].push({
                        id: site,
                        score: totalSites[food][site]
                    });
                }
            }
        }
    }
    function siteSortFunc(a, b) {
        return a.score < b.score;
    }
    for (food in foods) {
        if (foods.hasOwnProperty(food)) {
            siteRanks[food].sort(siteSortFunc);
        }
    }

    // Update "Our Recommendations"
    for (food in foods) {
        if (foods.hasOwnProperty(food)) {
            for (var i = 0; i < 3; i++) {
                var recSite = siteRanks[food][i];
                if (recSite !== undefined) {
                    $(".rec-item[food-id=" + food + "][rec-place=" + (i + 1) + "] > .rec-site").text(
                        siteNames[recSite["id"]] + " (" + recSite["score"].toFixed(1) + ")"
                    );
                }
            }
        }
    }
}
